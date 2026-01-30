export default interface Petition {
  request_id: string,
  id: string
  type: string
  department: string
  subject: string
  description: string
  solved: boolean
}