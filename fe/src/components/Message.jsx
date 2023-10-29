import React from 'react'

function Message({ message }) {
    return (
        <div aria-live="polite" aria-atomic="true" style={{ position: 'relative', minHeight: 200 }}>
            <div className="toast" style={{ position: 'absolute', top: 0, right: 0 }}>
                <div className="toast-header">
                    <img src="..." className="rounded mr-2" alt="..." />
                    <strong className="mr-auto">Message</strong>
                    <button type="button" className="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div className="toast-body">
                    {message}
                </div>
            </div>
        </div>

    )
}

export default Message