import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { GetSearchMovies } from "../redux/actions/getSearch";

const ReduxSearchPage = () => {
  const { title } = useParams();
  const [SearchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const searchData = useSelector((state) => state.searchBox.searchMovies);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);

    dispatch(GetSearchMovies(title))
      .then(() => {
        setLoading(false);
      })
      .catch((err) => {
        console.log(err, "err search page");
        setLoading(false);
      });
  }, [title, dispatch]);

  useEffect(() => {
    if (!loading) {
      setSearchResult(searchData);
    }
  }, [searchData, loading]);

  return (
    <div>
      {loading ? (
        <h1>Sedang Memuat.....</h1>
      ) : (
        <div className="parents py-[1.2rem]">
          <div className="flex px-[1.5rem] justify-between items-center">
            <span className="font-extrabold text-[1.8rem] font-montserrat">
              Search : "{title}"
            </span>
            <div className="flex justify-center items-center h-[100%] cursor-pointer">
              <p className="text-red-600 font-normal font-montserrat hover:text-red-800">
                See All Movie
              </p>
              <i className="fas fa-arrow-right text-red-600 ml-1 hover:text-red-800"></i>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 mx-6 my-4">
            {SearchResult.map((movie) => {
              return (
                <div className="">
                  <Link to={`/${movie.id}`}>
                    <img
                      className="poster-section hover:scale-[105%] shadow-lg shadow-slate-600 rounded-md w-[17.5rem] min-h-[28rem]"
                      src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                      alt="poster_path"
                    />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ReduxSearchPage;
