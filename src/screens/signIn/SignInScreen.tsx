import React, { FC, useCallback, useContext, useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { useFormik } from 'formik';
import { Button, Card, HelperText, TextInput } from 'react-native-paper';
import { SignInData } from './interfaces/signInData';
import { signInValidationSchema } from './validations/signInValidationSchema';
import { PageLoader } from '../../components/atoms/pageLoader/PageLoader';
import ApiService from '../../query/services/ApiService';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AuthStackParamList } from '../../navigation/AuthStack';
import { UserContext } from '../../store/user/UserProvider';
import { setUser, setUserLoading } from '../../store/user/userActions';
import Api from '../../query/services/api';
import { CurrentUserRes } from '../../models/user/interfaces/currentUserRes';
import { currentUserResToCurrentUser } from '../../models/user/utils/currentUserResToCurrentUser';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const SignInScreen: FC = () => {
  const [isTokenLoading, setIsTokenLoading] = useState<boolean>(false);
  const { userState, dispatchUserState } = useContext(UserContext);

  const login = useCallback(async (token: string): Promise<void> => {
    const axiosInstanceService = ApiService.getInstance();

    axiosInstanceService.setAuthToken(token);

    const axios = axiosInstanceService.getAxiosInstance();

    dispatchUserState(setUserLoading(true));

    try {
      const res = await Api.get<CurrentUserRes>(axios, '/users/current-user');
      dispatchUserState(setUserLoading(false));
      dispatchUserState(setUser(currentUserResToCurrentUser(res.data)));
    } catch {
      await AsyncStorage.removeItem('userToken');
      dispatchUserState(setUserLoading(false));
    }
  }, []);

  const formik = useFormik<SignInData>({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: signInValidationSchema,
    onSubmit: async (val) => {
      try {
        setIsTokenLoading(true);
        const axios = ApiService.getInstance().getAxiosInstance();
        const { data } = await Api.post<{ token: string }, SignInData>({
          axios,
          url: '/users/login',
          body: val,
        });

        await login(data.token);
      } finally {
        setIsTokenLoading(false);
      }
    },
  });

  useEffect(() => {
    AsyncStorage.getItem('userToken').then((storageToken) => {
      if (!storageToken) return;
      login(storageToken).then();
    });
  }, [login]);

  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();
  const [secureTextEntry, setSecureTextEntry] = useState<boolean>(true);

  if (isTokenLoading || userState.loading) return <PageLoader />;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center', gap: 12 }}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%' }}>
          <View style={{ width: '90%' }}>
            <Card>
              <Card.Title title="SignIn" />
              <Card.Content>
                <TextInput
                  error={!!formik.errors.email}
                  value={formik.values.email}
                  onChangeText={formik.handleChange('email')}
                  label="Email"
                />
                <HelperText type="error" visible={!!formik.errors.email}>
                  {formik.errors.email}
                </HelperText>
                <TextInput
                  label="Password"
                  error={!!formik.errors.password}
                  secureTextEntry={secureTextEntry}
                  onChangeText={formik.handleChange('password')}
                  right={
                    <TextInput.Icon
                      icon="eye"
                      onPress={() => setSecureTextEntry(!secureTextEntry)}
                    />
                  }
                />
                <HelperText type="error" visible={!!formik.errors.password}>
                  {formik.errors.password}
                </HelperText>
              </Card.Content>
              <Card.Actions>
                <Button onPress={() => formik.handleSubmit()}>LogIn</Button>
              </Card.Actions>
            </Card>
          </View>
        </View>
        <View style={{ alignItems: 'center', marginBottom: 20 }}>
          <Button mode="text" onPress={() => navigation.navigate('ForgotPassword')}>
            Forgot password
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
