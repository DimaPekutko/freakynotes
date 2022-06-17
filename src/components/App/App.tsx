import React from 'react';
import './../../styles/App.scss';



function App() {
  
  const mouseEnterHandler = (event: React.MouseEvent<HTMLTextAreaElement>) => {
    const element = (event.target as HTMLTextAreaElement)
    element.style.height = String(element.scrollHeight) + "px";
  };

  const mouseLeaveHandler = (event: React.MouseEvent<HTMLTextAreaElement>) => {
    const element = (event.target as HTMLTextAreaElement)
    element.style.height = "100%";
  };

  return (
    <div className="App container">
        <h1 className='text-center pt-3'>Freaky Notes</h1>
        <div className="container catalog_wrap">
          <div className="row note_item container my-4">
              <div className="row mb-2">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure delectus nulla atque odio quas repudiandae in qui laboriosam? Voluptatum cumque pariatur facilis doloremque mollitia reiciendis neque nulla rerum corporis laudantium!
              </div>
              <hr />
              <div className="row tags my-0">
                @tag @tag @tag @tag
              </div>
          </div>
          <div className="row note_item container my-4">
              <div className="row mb-2">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure delectus nulla atque odio quas repudiandae in qui laboriosam? Voluptatum cumque pariatur facilis doloremque mollitia reiciendis neque nulla rerum corporis laudantium!
              </div>
              <hr />
              <div className="row tags my-0">
                @tag @tag @tag @tag
              </div>
          </div>
          <hr />
          <div className="row d-flex justify-content-center">
            <div className="col-12 d-flex justify-content-center mt-1">
              <button className="btn">New Note</button>
            </div>
          </div>
        </div>
    </div>
  );
}

export default App;
