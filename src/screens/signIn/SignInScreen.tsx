import React, { FC, useState } from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { useFormik } from 'formik';
import { Button, Card, HelperText, TextInput } from 'react-native-paper';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AuthStackParamList } from '../../navigation/AuthStack';
import { SignInData } from './interfaces/signInData';
import { signInValidationSchema } from './validations/signInValidationSchema';

export const SignInScreen: FC = () => {
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();
  const [secureTextEntry, setSecureTextEntry] = useState<boolean>(true);

  const formik = useFormik<SignInData>({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: signInValidationSchema,
    onSubmit: (val) => {
      console.log(val, 'onSubmit');
    },
  });

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
