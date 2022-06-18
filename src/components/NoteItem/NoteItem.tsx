import React, { ReactElement, useEffect, useState } from 'react';
import { Note } from '../../global/types';

import HashTagItem from '../HashTagItem/HashTagItem';

import "../../styles/NoteItem.scss"

function NoteItem(props: Note & {toHighlightWords: boolean}) {


    const getHighlightedContent = (content: string): ReactElement[] => {
        const tag_names: string[] = [];
        const parts: string[] = content.split(/[ ,#]/)
        props.tags.map(tag => { 
            tag_names.push(tag.name.toLocaleLowerCase());
        })
        
        return parts.map((part, idx) => (
            <span className={
                tag_names.includes(part.toLowerCase()) ?
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
                        props.toHighlightWords ?
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
