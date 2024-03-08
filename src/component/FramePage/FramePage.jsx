import './FramePage.scss'
import Appbar from '../Appbar/Appbar'
import Footer from '../Footer/Footer'

export default function FramePage({ children }) {
    return (
        <div className="frame-page">
            <Appbar />
            <main className="frame-page__main">
                {children}
            </main>
            <Footer />
        </div>
    )
}