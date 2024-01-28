import {useNavigate} from "react-router-dom";

const ButtonBack = () => {
  const navigate = useNavigate()

  return (
    <button className="mt-10 block ml-auto border rounded-xl py-2 px-4 hover:bg-slate-200"
            onClick={() => navigate(-1)}>Back</button>
  )
}

export default ButtonBack