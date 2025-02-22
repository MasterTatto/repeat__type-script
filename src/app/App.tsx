import './App.css'
import Header from '@/common/components/header'
import Main from '@/app/main.tsx'

export type FilterType = 'all' | 'active' | 'completed'

export const App = () => {
    return (
        <div className="app">
            <Header />
            <Main />
        </div>
    )
}
