import { Request, Response } from 'express'
import { getProfileUser } from '../../services/user/profile-user'

export async function profile(req: Request, res: Response) {
  const userId = req.user_id

  const user = await getProfileUser({userId})

  return res.status(200).send({ user })
}