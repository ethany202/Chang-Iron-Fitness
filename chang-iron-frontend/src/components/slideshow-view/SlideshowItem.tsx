import React from "react";

import './SlideshowItem.css';

/**
 * 
 * @param {string} backgroundImage: Corresponds to a link to an image source, serving as the background image for the current slideshow
 * @returns A React component representing a slideshow content block for the slideshow as a whole (see "Home Page")
 */
export default function SlideshowItem({ backgroundImage }) {

    return (
        <div className="slideshow-background" style={{
            backgroundImage: `url('${backgroundImage}')`
        }}>
            {/* <div className="slideshowComponent">
                <Markdown 
                    children={bannerContent} 
                    remarkPlugins={[remarkGfm]} />
            </div> */}
        </div>
    )
}
