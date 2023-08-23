import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export function useAuthRedirect(state, aim = null) {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const sessionIntended = sessionStorage.getItem('intended') && JSON.parse(sessionStorage.getItem('intended'));

  useEffect(() => {
    if(state !== aim && aim !== null){
      const intended = {
        path : currentPath,
        aim : aim
      }

      sessionStorage.setItem('intended', JSON.stringify(intended));
    }
  }, [])

  useEffect(() => {
    if(state !== aim && aim !== null){
      if(sessionIntended && sessionIntended.aim === state){
        sessionStorage.removeItem('intended');
        navigate(sessionIntended.path);
      }else{
        navigate(aim ? '/auth/login' : '/');
      }
    }
  }, [state, navigate])
}