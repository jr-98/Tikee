/* eslint-disable react/self-closing-comp */
import { Box, Typography, Button, Grid, Divider } from '@mui/material';
import { Link, NavLink as RouterLink } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import MDBox from 'src/components/MDBox';
// import Logo from 'src/components/LogoSign';
import { useForm } from 'react-hook-form';
import InputText from 'src/components/Input/InputFormText';
import { useFormData } from 'src/hooks/useFormData';
import { colors } from 'src/theme/base/colors';
import { useLogin } from 'src/hooks/useLogin';
import SuspenseLoader from 'src/components/SuspenseLoader';
import LabelError from 'src/components/Text/LabelError';
import RenderIconButton from 'src/components/Icon/IconButton';

const Login = () => {

	const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'onBlur' });
	const { customOnKeyUp, isDisabledButton } = useFormData();
	const { dataLogin, handleLogin, handleShowPassword, isShowPassword } = useLogin();
	const { dataResponse, loading } = dataLogin;

	return (
		<>
			<Helmet>
				<title>Login</title>
			</Helmet>
			<Box
				height={'100%'}
				display={'flex'}
				flex='1 1 0%'
				flexDirection={'column'}
				bgcolor={colors.primary.lighter}
				sx={{
					backgroundImage: 'url("/static/images/logos/login-bg-1.png")',
					backgroundSize: 'cover',
					backgroundRepeat: 'no-repeat',
					backgroundPosition: 'center',
					backgroundColor: 'white !important',
				}}>
				<Box width={'100%'} display={'block'} flex='1 1 0%' padding={'20px'} height={'100%'}>
					<Grid container height={'100%'}>
						<Grid item xs={12} lg={6} display={'flex'} justifyContent={'center'} alignItems={'center'}>
							<MDBox
								shadow='xl'
								display='block'
								alignItems='center'
								bgColor='white'
								width={'550px'}
								height='75%'
								p={5}
								sx={{
									borderRadius: 5
								}}>
								<form
									id='form-login'
									autoComplete='off'
									onSubmit={
										handleSubmit(data => {
											handleLogin({ username: data['user-name'], password: data['password'] })
										})
									}
									style={{
										height: '100%'
									}}>
									<Grid container direction={'column'} justifyContent={'space-between'} height={'100%'}>
										<Grid item>
											<Typography variant="h2" sx={{ mb: 1 }}>
												Iniciar sesión
											</Typography>
											<Typography
												variant="h4"
												color="text.secondary"
												fontWeight="normal"
												sx={{ mb: 3 }}>
												Complete los campos a continuación para iniciar sesión en su cuenta.
											</Typography>
										</Grid>
										<InputText
											id={'field-user-name'}
											name={'user-name'}
											title={'Usuario'}
											className={'input-login'}
											type={'text'}
											register={register}
											error={errors}
											handleOnKeyUp={customOnKeyUp}
											inputProps={{ readOnly: loading }}
										/>
										<InputText
											id={'field-password'}
											name={'password'}
											title={'Contraseña'}
											className={'input-login'}
											placeHolder={'Contraseña'}
											type={isShowPassword ? 'text' : 'password'}
											register={register}
											error={errors}
											handleOnKeyUp={customOnKeyUp}
											inputProps={{ readOnly: loading }}
											endAdornment={
												<RenderIconButton
													handleActionButton={handleShowPassword}
													icon={isShowPassword ? 'visibility' : 'visibilityOff'} />
											} />
										{
											(dataResponse.length > 0 && dataResponse?.status !== 200)
												?
												<Grid item>
													<LabelError text={dataResponse?.info_response} color={'red'} />
												</Grid>
												:
												null
										}
										<Grid item>
											{
												loading
													?
													<SuspenseLoader position='initial' />
													:
													<Box pt={1}>
														<Button
															form={'form-login'}
															variant='contained'
															LinkComponent={RouterLink}
															type='submit'
															disabled={isDisabledButton}
															fullWidth
															sx={{
																paddingTop: 1,
																fontSize: '20px'
															}}>
															Iniciar sesión
														</Button>
													</Box>
											}
										</Grid>
										<Grid item>
											<Grid container direction={'column'} spacing={3}>
												<Grid item>
													<Typography fontWeight={'bold'} color={'primary'}>¿Olvidaste tu contraseña?</Typography>
												</Grid>
												<Grid item>
													<Divider sx={{ height: '3px' }} />
												</Grid>
												<Grid item>
													<Typography variant='body1' fontWeight={'bold'}>¿No tienes una cuenta aún? <Link to={'#'} style={{ textDecoration: 'none', color: colors.primary.main }}>Regístrate aquí</Link></Typography>
												</Grid>
											</Grid>
										</Grid>
									</Grid>
								</form>
							</MDBox>
						</Grid>
						<Grid item xs={0} lg={6} display={{ xs: 'none', lg: 'block' }}>
							<Grid margin='auto'
								sx={{
									display: 'block',
									alignItems: 'center',
									padding: 8,
									margin: 'auto',
									height: '100%'
								}}>
								<img alt='imgLog' height='80%' width='80%' src={'/static/images/logos/tikee-log-white.png'} />
							</Grid>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</>
	)
}

export default Login