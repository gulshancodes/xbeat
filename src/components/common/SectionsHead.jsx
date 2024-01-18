import React from 'react';

const SectionsHead = (props) => {
    return (
        <>
            <div className="section_head">
                <h2 className="heading">{props.heading}</h2>
            </div>
        </>
    );
};

export default SectionsHead;