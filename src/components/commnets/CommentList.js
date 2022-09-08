import React from "react";
import parser from "html-react-parser";

const CommentList = ({ comments }) => {
    return (
        <div className="flex flex-col items-start">
            {comments.map((com) => {
                return (
                    <div
                        key={com.id}
                        className="bg-stone-500 p-4 rounded-lg text-white mb-4"
                    >
                        <header className="text-xl font-semibold mb-2">
                            {com.name}
                        </header>
                        <p>{parser(com.text)}</p>
                    </div>
                );
            })}
        </div>
    );
};

export default CommentList;
