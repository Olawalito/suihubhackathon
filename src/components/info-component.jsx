import arrow from '../assets/arrow.png'

export default function Information(props) {
  const large = Boolean(props.large)
    const containerClass = large
      ? 'bg-[#111111E5] text-sm p-6 mt-6 rounded-2xl backdrop-blur-2xl w-full max-w-xs mx-auto'
      : 'bg-[#111111E5] text-sm p-4 mt-4 rounded-2xl backdrop-blur-2xl w-full max-w-xs mx-auto'
  const imgClass = large ? 'w-10 h-auto' : 'w-10 h-auto md:w-12 md:h-auto'
  const headingClass = large ? 'my-3 italic text-3xl' : 'my-3 italic text-lg md:text-2xl'
  const infoClass = large ? 'text-base' : 'text-sm md:text-base'
  const stepClass = large ? 'text-base' : 'text-sm'

  return (
    <div className={containerClass}>
      <div className="flex justify-between items-center text-white">
        <p className={stepClass}>STEP {props.step}</p>
        <img src={arrow} alt="arrow" className="w-5 h-5" />
      </div>

      <div className="text-white flex justify-center flex-col items-center mt-4">
        <img src={props.img} alt="infoicon1" className={imgClass} />
      </div>

      <div className="text-white text-center mt-4">
        <h2 className={headingClass}>{props.heading}</h2>
        <p className={infoClass}>{props.info}</p>
      </div>
    </div>
  )
}