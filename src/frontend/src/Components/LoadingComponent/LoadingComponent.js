import React from "react";
import {RotateSpinner} from 'react-spinners-kit';

export function LoadingComponent(){
        return (
            <div style={{
                position: 'absolute', left: '50%', top: '50%',
                transform: 'translate(-50%, -50%)'
            }}>
                <RotateSpinner size={80} color={'#8A0CDC'} />

            </div>

        )


}
