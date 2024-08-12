import Card from "../Components/Card";

export default function MovieWrap({ h4, dat }) {
  console.log(dat);
  return (
    <div className="movie-wrap">
      <h4>{h4}</h4>
      {/* <div className="buttons">
            <button onClick={() => {}}>{"<"}</button>
            <p>Page: {currentPopPage + 1}</p>
            <button onClick={() => {}}>{">"}</button>
          </div> */}

      <div className="movie">
        {dat &&
          dat.data.results.length != 0 &&
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
