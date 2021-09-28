import React from "react";

export default class Toast extends React.Component {
    handleToastClick() {
        // eslint-disable-next-line
        eval('$(".toast").toast("show")');
    }

    render() {
        const { imgsrc, name, body, time } = this.props;
        return (
            <div className='toast bg-dark text-white' role='alert' aria-live='assertive' aria-atomic='true'>
                <div className='toast-header bg-dark text-white'>
                    {imgsrc !== undefined
                    ?<img className='rounded me-2' src={imgsrc} alt='User'/>
                    :<svg className='rounded me-2' width='20px' height='20px' role='img'>
                        <rect width='100%' height='100%' fill='#007aff'/>
                    </svg>
                    }
                    <strong className="me-auto">{name}</strong>
                    <small>{time}</small>
                    <button className='btn-close btn-close-white' type='button' data-bs-dismiss='toast' aria-label='Close'/>
                </div>
                <div className='toast-body'>
                    {body}
                </div>
            </div>
        );
    }
}