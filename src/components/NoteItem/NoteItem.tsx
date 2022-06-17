import React from 'react';

import "../../styles/NoteItem.scss"

function NoteItem() {

    return (
        <div className="container">
            <div className="row note_item container my-4">
                <div className="row mb-2">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure delectus nulla atque odio quas repudiandae in qui laboriosam? Voluptatum cumque pariatur facilis doloremque mollitia reiciendis neque nulla rerum corporis laudantium!
                </div>
                <hr />
                <div className="row tags my-0">
                    @tag @tag @tag @tag
                </div>
            </div>
        </div>
    );
}

export default NoteItem;
