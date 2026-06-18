function ProgressBar({ currentStep }) {

  const percentage =
    (currentStep / 5) * 100;

  return (

    <div>

      <div
        className="
        flex
        justify-between
        text-sm
        mb-2
        text-gray-500
      "
      >

        <span>Start</span>

        <span>
          {percentage}%
        </span>

        <span>Finish</span>

      </div>

      <div
        className="
        w-full
        bg-gray-200
        h-4
        rounded-full
        overflow-hidden
      "
      >

        <div
          className="
          h-full
          bg-gradient-to-r
          from-pink-500
          to-purple-500
          transition-all
          duration-500
        "
          style={{
            width: `${percentage}%`
          }}
        />

      </div>

    </div>

  );

}

export default ProgressBar;