import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native'
import React, { useState } from 'react'
import { usePathname, router } from 'expo-router'

import { icons } from '../constants'

const SearchInput = () => {
  const pathname = usePathname()
  const [query, setQuery] = useState('')
  return (
    <View className='w-full h-16 px-4 bg-black-100 border-black-200 border-2 rounded-2xl focus:border-secondary items-center flex-row space-x-4'>
      <TextInput
        className='text-white flex-1 font-pregular mt-0.5 text-base'
        value={query}
        placeholder='Search for a video topic'
        placeholderTextColor='#CDCDE0'
        onChangeText={(e) => setQuery(e)}
      />
      <TouchableOpacity
        onPress={() => {
          if (!query) {
            return Alert.alert('Missing query', 'please enter something')
          }
          if (pathname.startsWith('/search')) router.setParams({ query })
          else router.push(`/search/${query}`)
        }}
      >
        <Image source={icons.search} className='w-5 h-5' resizeMode='contain' />
      </TouchableOpacity>
    </View>
  )
}

export default SearchInput
