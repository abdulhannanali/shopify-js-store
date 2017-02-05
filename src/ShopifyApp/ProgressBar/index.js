import React from 'react'
import './index.css'


const ProgressBar = () => (
    <div className='Loading-Bar'>
        <h1>Loading.....</h1>
        <div className='progress progress-striped active'>
            <div className='progress-bar' 
                role='progressbar'
                aria-valuenow='100'
                aria-valuemin='0'
                aria-valuemax='100'
                style={{width: '100%'}}>
            </div>
        </div>
    </div>
)

export default ProgressBar