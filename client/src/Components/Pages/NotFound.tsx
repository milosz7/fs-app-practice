import NotFoundError from "../Views/NotFoundError";

const NotFound = () => {
  return <NotFoundError title="Something went wrong!" message="The page you were looking for was not found." />;
};

export default NotFound;
