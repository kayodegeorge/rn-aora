import { Image, ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../constants'
import CustomButton from '../components/CustomButton'
import { StatusBar } from 'expo-status-bar'
import { Redirect, router } from 'expo-router'
import { useGlobalContext } from '../context/GlobalProvider'

const App = () => {
  const { isLoading, isLoggedIn } = useGlobalContext()

  if (!isLoading && isLoggedIn) return <Redirect href='/home' />
  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView
        contentContainerStyle={{
          height: '100%',
        }}
      >
        <View className='w-full min-h-[85vh] px-4 items-center justify-center'>
          <Image
            className='w-[130px] h-[84px]'
            resizeMode='contain'
            source={images.logo}
          />
          <Image
            source={images.cards}
            className='max-w-[380px] w-full h-[300px]'
            resizeMode='contain'
          />

          <View className='relative mt-5'>
            <Text className='text-3xl font-bold text-center text-white'>
              Dsicover Endless Possibilities with{' '}
              <Text className='text-secondary-200'>Aora</Text>
            </Text>

            <Image
              source={images.path}
              className='w-[136px] h-[15px] absolute -bottom-2 -right-8'
              resizeMode='contain'
            />
          </View>
          <Text className='text-gray-100 mt-7 text-center text-sm font-pregular'>
            Where creativity meets innovation: embark on a journey
          </Text>
          <CustomButton
            title='Continue with Email'
            handlePress={() => {
              router.push('/sign-in')
            }}
            containerStyles='w-full mt-7'
          />
        </View>
      </ScrollView>
      <StatusBar backgroundColor='#161622' style='light' />
    </SafeAreaView>
  )
}

export default App
