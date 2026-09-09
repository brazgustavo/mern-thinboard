import Navbar from "../components/Navbar.jsx";
import NoteCard from "../components/NoteCard";
import RateLimiteUi from "../components/RateLimiteUi";
import { useEffect, useState } from "react"
import api from "../lib/axios";
import toast from "react-hot-toast"
import NotesNotFound from "../components/NotesNotFound.jsx";

const HomePage = () => {
  const [isreteLimited,setIsRateLimited] = useState(false)
  const [notes,setNotes] = useState([])
  const [loading, setLoaging] = useState(true)
  
  useEffect(()=>{
    const fetchNotes = async ()=>{
      try {
        const res = await api.get("/notes");
        console.log(res.data);
        setNotes(res.data)
        setIsRateLimited(false)
      } catch (error) {
        console.log("error");
        if(error.response?.status === 429){
          setIsRateLimited(true)
        } else{
          toast.error("Failed to load Notes")
        }
      } finally{
        setLoaging(false)
      }
    };
    fetchNotes();
  },[])
  
  return (
    <div className="min-h-screen">
      <Navbar/>

      {isreteLimited && <RateLimiteUi />}

      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && <div className="text-center text-primary py-10">Loading notes...</div>}

        {notes.length === 0 && !isreteLimited && <NotesNotFound />}

        {notes.length > 0 && !isreteLimited &&(
          <div className=" grid grid-cols-1 md:grid-cols-2 lg:grod-cols-3 gap-6">
            {notes.map(note =>(
              <NoteCard key={note._id} note={note} setNotes={setNotes} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default HomePage