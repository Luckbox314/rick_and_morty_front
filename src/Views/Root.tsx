import '../Style/Root.css';
import { Outlet } from 'react-router-dom';

export async function loader() {


}

function Root() {
  return (
    <>
      <header>
        <h1>
          Rick and Morty App
        </h1>
      </header>
      <div className='root-body'>
        <div className='main-container'>
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Root;
