import { db } from "@/lib/db";
import { Attachment, Chapter } from "@prisma/client";

type GetChapterProps = {
  userId: string;
  courseId: string;
  chapterId: string;
};

export const getChapter = async ({
  userId,
  courseId,
  chapterId,
}: GetChapterProps) => {
  try {
    const purchase = await db.purchase.findUnique({
        where: {
            userId_courseId: {
                userId,
                courseId
            }
        }
    })

    const course = await db.course.findUnique({
        where: {
            id: courseId,
            isPublished: true
        },
        select: {
            price: true
        }
    })

    const chapter = await db.chapter.findUnique({
        where: {
            id: chapterId,
            isPublished: true,
        }
    })

    if(!chapter || !course) {
        throw new Error("Chapter or Course not found.")
    }

    let muxData = null
    let attachmets: Attachment[] =[]
    let nextChapter: Chapter | null = null

    if(purchase) {
        attachmets = await db.attachment.findMany({
            where: {
                courseId: courseId
            }
        })
    }

    if(chapter.isFree || purchase) {
        muxData = await db.muxData.findUnique({
            where: {
                chapterId
            }
        })
        nextChapter = await db.chapter.findFirst({
            where: {
                courseId,
                isPublished: true,
                position: {
                    gt: chapter?.position
                }
            },
            orderBy: {
                position: 'asc'
            }
        }) 
    }

    const userProgress = await db.userProgress.findUnique({
        where: {
            userId_chapterId: {
                userId,
                chapterId
            }
        }
    })

    return {
        chapter,
        course,
        muxData,
        attachmets,
        nextChapter,
        userProgress,
        purchase
    }
  } catch (error) {
    console.log("[GET_CHAPTER]", error);
    return {
      chapter: null,
      course: null,
      muxData: null,
      attachmets: [],
      nextChapter: null,
      userProgress: null,
      purchase: null,
    };
  }
};
