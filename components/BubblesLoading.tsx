const BubblesLoading = ({validation, submit}:{validation:boolean,submit:boolean}) => {
  return (
    <div className={`absolute left-44 bottom-0 w-24 space-x-1 items-end ${(validation && submit) ? "flex" : "hidden"}  `}>
      <div className="w-4 h-4 rounded-full bg-Lavender-Blue drop-shadow-xl animate-expand_close"></div>
      <div className="w-5 h-5 rounded-full bg-Lavender-Blue drop-shadow-xl animate-expand_close"></div>
      <div className="w-6 h-6 rounded-full bg-Lavender-Blue drop-shadow-xl animate-expand_close"></div>
    </div>
  )
}

export default BubblesLoading