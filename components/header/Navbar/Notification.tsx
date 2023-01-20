
interface NotificationProps {
  id: number
  imageProfie: string
  newTitle: string
  reason: string
  username: string
}

const Notification = ({ id, imageProfie, newTitle, reason, username }: NotificationProps) => {
  return (
    <div>
        {/* Profile's image */}
        {/* Goals:
            I need to create a collection for the user's notifications, it will have
             username, reason, imageProfile.        
            It'll have a bottom saying "see more" 
            When an user click on a notification it will have a link to that notification
            If an user watch's all the notification the alarm will desapper
         */}
    </div>
  )
}

export default Notification