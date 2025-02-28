import { AppBar, Box, Button, IconButton, LinearProgress, Toolbar } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { useAppSelector } from '@/common/hooks/hooks.ts'
import { statusSelector } from '@/app/app_slice.ts'

const Header = () => {
	const status = useAppSelector(statusSelector)
	console.log(status)
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
					<IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
						<MenuIcon />
					</IconButton>
					<Box>
						<Button color="inherit">Sign in</Button>
						<Button color="inherit">Sign up</Button>
					</Box>
				</Toolbar>
				{status === 'loading' && <LinearProgress />}
			</AppBar>
		</Box>
	)
}

export default Header
