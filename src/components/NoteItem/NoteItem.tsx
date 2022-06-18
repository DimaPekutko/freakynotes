import React from 'react';
import { Note } from '../../global/types';

import HashTagItem from '../HashTagItem/HashTagItem';

import "../../styles/NoteItem.scss"

function NoteItem(props: Note) {
    return (
        <div className="container">
            <div className="row note_item container my-4">
                <div className="d-flex mb-2 content">
                    {props.content}
                </div>
                <hr />
                <div className="d-flex flex-wrap note_tags_wrap">
                    {
                        props.tags.map((value, idx) => {
                            return (
                                <HashTagItem key={idx} name={value.name}/>
                            )
                        }) || 2
                    }
                </div>
            </div>
        </div>
    );
}

export default NoteItem;
