import React, { ReactElement, useEffect, useState } from 'react';
import { Note } from '../../global/types';

import HashTagItem from '../HashTagItem/HashTagItem';

import "../../styles/NoteItem.scss"

function NoteItem(props: Note & {tagToHighlight: string}) {

    const getHighlightedContent = (content: string): ReactElement[] => {
        const parts: string[] = content.split(/[ ,]/)        
        return parts.map((part, idx) => (
            <span className={
                part.toLocaleLowerCase().indexOf(props.tagToHighlight) === 0 ?
                "highlighted_tag" :
                ""
            } key={idx}> {part}&nbsp;</span>
        ));
    }

    return (
        <div className="container">
            <div className="row note_item container my-4">
                <div className="d-flex flex-wrap mb-2 content">
                    {
                        props.tagToHighlight.length > 0 ?
                        getHighlightedContent(props.content):
                        props.content
                    }
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
