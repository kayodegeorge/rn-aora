import {
  View,
  Text,
  ImageBackground,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native'
import * as Animatable from 'react-native-animatable'
import { useState } from 'react'
import { icons } from '../constants'
import { Video, ResizeMode } from 'expo-av'

const zoomIn = {
  0: {
    scale: 0.9,
  },
  1: {
    scale: 1.1,
  },
}
const zoomOut = {
  0: {
    scale: 1,
  },
  1: {
    scale: 0.9,
  },
}

const TrendingItem = ({ activeItem, item }) => {
  const [play, setPlay] = useState(false)

  return (
    <Animatable.View
      className='mr-5'
      animation={activeItem === item.$id ? zoomIn : zoomOut}
      duration={500}
    >
      {play ? (
        <Video
          source={{ uri: item.video }}
          className='w-52 h-72 rounded-[35px] mt-3 bg-white/10'
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status) => {
            if (status.didJustFinish) {
              setPlay(false)
            }
          }}
        />
      ) : (
        <TouchableOpacity
          className='relative justify-center items-center'
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
        >
          <ImageBackground
            source={{ uri: item.thumbnail }}
            className='w-52 h-72 rounded-[35px] overflow-hidden my-5 shadow-lg shadow-black/40'
            resizeMode='cover'
          />
          <Image
            source={icons.play}
            className='h-12 w-12 absolute'
            resizeMode='contain'
          />
        </TouchableOpacity>
      )}
    </Animatable.View>
  )
}

const Trending = ({ posts }) => {
  const [activeItem, setActiveItem] = useState(posts[1])

  const viewAbleItemsChanged = ({ viewableItems }) => {
    if (viewableItems && viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key)
    }
  }

  return (
    <FlatList
      data={posts}
      keyExtractor={(item, index) =>
        item.id ? item.id.toString() : index.toString()
      } // Ensure unique keys
      renderItem={({ item }) => (
        <TrendingItem activeItem={activeItem} item={item} />
      )}
      onViewableItemsChanged={viewAbleItemsChanged}
      viewabilityConfig={{ itemVisiblePercentThreshold: 70 }}
      contentOffset={{ x: 170 }}
      horizontal
    />
  )
}

export default Trending
