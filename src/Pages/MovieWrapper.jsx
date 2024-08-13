import Card from "../Components/Card";

export default function MovieWrap({
  h4,
  dat,
  prevPage,
  nextPage,
  setCurrent,
  current,
}) {
  return (
    <div className="movie-wrap">
      <h4>{h4}</h4>
      <div className="buttons">
        <button onClick={() => prevPage(setCurrent, current)}>{"<"}</button>
        <p>Page: {current}</p>
        <button onClick={() => nextPage(setCurrent, current)}>{">"}</button>
      </div>

      <div className="movie">
        {dat &&
          dat.data &&
          dat.data.results &&
          dat.data.results.length !== 0 &&
          dat.data.results.map((movie, index) => {
            return (
              <div className="card" key={index}>
                <Card movie={movie} />
              </div>
            );
          })}
      </div>
    </div>
  );
}
