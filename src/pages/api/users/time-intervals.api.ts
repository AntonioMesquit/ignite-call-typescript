import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { buildNextAuthOptions } from '../auth/[...nextauth].api'
import { z } from 'zod'
import { prisma } from '@/src/lib/prisma'

const timeIntervalsBodySchemas = z.object({
  intervals: z.array(
    z.object({
      weekday: z.number(),
      startTimeInMinutes: z.number(),
      endTimeInMinutes: z.number(),
    }),
  ),
})
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).end()
  }

  const session = await getServerSession(
    req,
    res,
    buildNextAuthOptions(req, res),
  )
  if (!session) {
    return res.status(401).end()
  }
  const { intervals } = timeIntervalsBodySchemas.parse(req.body)
  await Promise.all(
    intervals.map((intervals) => {
      return prisma.userTimeInterval.create({
        data: {
          week_day: intervals.weekday,
          time_start_in_minutes: intervals.startTimeInMinutes,
          time_end_in_minutes: intervals.endTimeInMinutes,
          user_id: session.user?.id,
        },
      })
    }),
  )
  return res.status(201).end()
}
