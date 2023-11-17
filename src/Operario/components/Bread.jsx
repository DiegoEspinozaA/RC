import { Link, useLocation } from "react-router-dom";
import { splitCamelCase } from "../../funciones";
import {
  Typography,
} from "@material-tailwind/react";
export default function Bread() {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(crumb => crumb !== '');



  const crumbs = pathSegments.map((crumb, index) => {
    const isLastCrumb = index === pathSegments.length - 1;
    const anterior = pathSegments[index - 1];
    const actual = pathSegments[index];

    if(anterior === 'historialCamara'){
      if(!isNaN(parseInt(actual))){
        crumb = 'historial camara ' + actual
      }
    }

    if (anterior === 'camara') {
      if (!isNaN(parseInt(actual))) {
        crumb = 'registros camara ' + actual
      }
    }

  
    if (anterior === 'historial') {
      if (!isNaN(parseInt(actual))) {
        crumb = 'historial ' + actual
      }
    }
    const linkTo = isLastCrumb ? null : `/${pathSegments.slice(0, index + 1).join('/')}`;
    return (
      <li key={crumb}>
        {isLastCrumb ? (
          <p className="semibold">
            {splitCamelCase(crumb).join(' ')}
          </p>
        ) : (
          <div className="flex items-center text-blue-gray-900 antialiased cursor-pointer hover:text-blue-500">
            <Link to={linkTo}>
              <Typography
                variant="small"
                className="font-xs  hover:text-blue-500 "
              >
               

                {splitCamelCase(crumb).join(' ') === 'camara'
                  ?
                  '' : <>
                    {splitCamelCase(crumb).join(' ') === 'historial'
                      ?
                      '' : <>
                      {splitCamelCase(crumb).join(' ') === 'historial Camara'
                      
                      ? '' : <>
                        <div className="flex align-center items-center">

                          {splitCamelCase(crumb).join(' ')}
                          <svg className="w-3 h-3 text-gray-400 mx-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
                          </svg>
                        </div>

                      </>
                      }
                     </> 
                    }
                  </>
                }





              </Typography>
            </Link>
          </div>
        )}
      </li>
    );
  });

  return (
    <div className="">
      <ol className="flex flex-wrap items-center w-full bg-opacity-60 rounded-md bg-transparent p-0 transition-all capitalize">
        {crumbs}
      </ol>
    </div>
  );
}
