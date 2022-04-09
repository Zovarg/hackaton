import React from 'react';
import cl from './MyModel.module.css';
const MyModel = ({children, visible,setVisible}) => {

    const rootClasses=[cl.myModal]
    if(visible){
        rootClasses.push(cl.active);
    }
    return (
        <div className={rootClasses.join(' ')} onClick={()=>setVisible(false)}>
            <div className={cl.myModalContent} onClick={(e) =>e.stopPropagation()}>
                {children}
               <button className={cl.buttonClose} onClick={()=>setVisible(false)}>Закрыть</button>
            </div>
        </div>
    );
};

export default MyModel;