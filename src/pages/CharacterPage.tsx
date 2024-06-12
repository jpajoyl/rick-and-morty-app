import { Params, useNavigate, useParams } from 'react-router-dom';
import { useCharacter } from '../hooks/useCharacter';
import { ContextApp } from '../context/ContextApp';
import { useContext, useEffect, useState } from 'react';

const CharacterPage = () => {
  const { id } = useParams<Params>();
  const navigate = useNavigate();
  const { loading, character } = useCharacter(id || '');
  const { setComments, comments } = useContext(ContextApp);
  const [comment, setComment] = useState('')

  function handleComments(idCharacter: string, comment: string) {



    if (!!comments.find(c => c.id === idCharacter)) {
      const newComments = comments.map(com => {
        return {
          id: com.id,
          comments: [...com.comments, comment]
        }
      })
      setComments(newComments)
    } else {
      setComments([...comments, {
        id: idCharacter,
        comments: [comment]
      }])
    }

  }
  useEffect(() => {


  }, [id])


  return (
    <>

      {!loading && (
        <div className="w-full md:w-3/4 p-4">
          <i onClick={() => navigate('/')} className="fa-solid fa-arrow-left fa-2x px-2 pt-2 md:px-10 md:pt-10 mb-10 block md:hidden text-purple-500"></i>
          <div className="flex flex-col items-start p-2 md:p-10">
            <img
              src={character?.image}
              alt={character?.name}
              className="w-32 h-32 rounded-full mb-4"
            />
            <h1 className="text-3xl font-bold mb-2">{character?.name}</h1>
            <div className='divide-y w-full'>
              <div className='py-4'>
                <p className="font-normal text-xl">Specie</p>
                <p className="text-sm text-slate-600">{character?.species}</p>
              </div>
              <div className='py-4'>
                <p className="font-normal text-xl">Status</p>
                <p className="text-sm text-slate-600">{character?.status}</p>
              </div>
              <div className='py-4'>
                <p className="font-normal text-xl">Gender</p>
                <p className="text-sm text-slate-600">{character?.gender}</p>
              </div>
            </div>
            <div className="w-full">
              <h2>Comentarios</h2>
              <ol className=' divide-y'>
                {comments.find(c => c.id === id)?.comments?.map(com => (
                  <li className=''>{com}</li>
                ))}

              </ol>
            </div>
            <div className='w-full'>
              <label htmlFor="comments">nuevo comentario</label>
              <textarea onChange={(e) => setComment(e.target.value)} onBlur={(e) => handleComments(id || '', comment)} value={comment} className='md:p-2 border border-solid w-full' name="comments" id="comments"></textarea>
            </div>
          </div>

        </div>
      )
      }</>




  )
}

export default CharacterPage