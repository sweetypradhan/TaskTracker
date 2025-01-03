import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setTasks, setSearchQuery } from './redux/taskSlice';
import ListTasks from './components/ListTasks';
import Search from './components/Search';
import CreateButton from './components/CreateButton';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import { isMobile } from 'react-device-detect';
import { Toaster } from 'react-hot-toast';
import axios from 'axios';

function App() {
  const dispatch = useDispatch();
  const searchQuery = useSelector((state) => state.tasks.searchQuery);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/tasks', {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.status === 200) {
          const tasks = Array.isArray(response.data) ? response.data.flat() : [];
          dispatch(setTasks(tasks));
        } else {
          console.error('Failed to fetch tasks:', response.data);
        }
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, [dispatch]);

  return (
    <>
      <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
        <Toaster />
      
        <p className="text-6xl text-center mt-7 mb-4 mx-auto max-w-2xl text-gray-800 transform -translate-x-4 flex items-center justify-center">
          <i className="fas fa-tasks mr-4 text-yellow-50"></i> 
          TaskTracker
        </p>

        <div className="flex flex-wrap justify-center p-3 gap-16 pt-24">
          <Search
            searchQuery={searchQuery}
            setSearchQuery={(query) => dispatch(setSearchQuery(query))}
          />
          <CreateButton />
        </div>
        <div className="flex flex-col items-center p-3 gap-16 pt-32">
          <ListTasks />
        </div>
      </DndProvider>
    </>
  );
}

export default App;
