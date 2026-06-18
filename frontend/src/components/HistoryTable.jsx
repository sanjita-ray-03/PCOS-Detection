function HistoryTable({ records }) {

  if (!records || records.length === 0) {

    return (

      <div
        className="
        bg-white
        rounded-3xl
        shadow-lg
        p-12
        text-center
        border
        border-pink-100
      "
      >

        <div className="text-6xl mb-4">
          📋
        </div>

        <h2
          className="
          text-2xl
          font-bold
          text-gray-700
        "
        >
          No Assessments Yet
        </h2>

        <p
          className="
          text-gray-500
          mt-3
        "
        >
          Complete your first PCOS assessment
          to start tracking your health history.
        </p>

      </div>

    );

  }

  return (

    <div
      className="
      bg-white
      rounded-3xl
      shadow-xl
      overflow-hidden
      border
      border-pink-100
    "
    >

      <div
        className="
        px-8
        py-5
        bg-gradient-to-r
        from-pink-500
        to-purple-500
      "
      >

        <h2
          className="
          text-white
          text-2xl
          font-bold
        "
        >
          Assessment History
        </h2>

      </div>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr
              className="
              bg-pink-50
              text-gray-700
            "
            >

              <th className="p-5 text-left">
                Assessment Date
              </th>

              <th className="p-5 text-left">
                Risk Level
              </th>

              <th className="p-5 text-left">
                Probability
              </th>

            </tr>

          </thead>

          <tbody>

            {records.map((item, index) => (
              

              <tr
                key={item.id}
                className={`
                  border-b
                  hover:bg-pink-50
                  transition
                  ${
                    index % 2 === 0
                      ? "bg-white"
                      : "bg-gray-50"
                  }
                `}
              >

                <td
                  className="
                  p-5
                  font-medium
                "
                >
                  {item.createdAt?.seconds
                    ? new Date(
                        item.createdAt.seconds * 1000
                      ).toLocaleDateString(
                        "en-IN",
                        {
                          day: "numeric",
                          month: "short",
                          year: "numeric"
                        }
                      )
                    : "N/A"}
                </td>

                <td className="p-5">

                  <span
                    className={`
                    px-4
                    py-2
                    rounded-full
                    text-sm
                    font-semibold

                    ${
                      item.riskLevel === "High"
                        ? "bg-red-100 text-red-600"
                        : item.riskLevel === "Moderate"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-600"
                    }
                    `}
                  >
                    {item.riskLevel}
                  </span>

                </td>

                <td
                  className="
                  p-5
                  font-semibold
                "
                >
                  {item.probability}%
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

}

export default HistoryTable;