import React from 'react';
import { Note } from '../../global/types';

import "../../styles/NoteItem.scss"

function NoteItem(props: Note) {
    return (
        <div className="container">
            <div className="row note_item container my-4">
                <div className="row mb-2">
                    {props.content}
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
