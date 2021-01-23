import React, {useContext} from 'react'
import {Linking, View} from 'react-native'
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import {connect} from 'react-redux'
import TextMontserrat from '../../Components/TextMontserrat'
import TextOpenSans from '../../Components/TextOpenSans'
import Colors from '../../Config/Colors'
import {AuthContext} from '../../Contexts/AuthProvider'
import {getRealmInstance} from '../../Database'
import {AccountsNavigationProps} from '../../Navigation/types'
import {dispatchHandler} from '../../State-management'

type Props = {navigation: AccountsNavigationProps}

const Accounts: React.FunctionComponent<Props> = (props: Props) => {
  const realm = getRealmInstance()
  const {logout} = useContext(AuthContext)
  // const [pushNotificationToggler, setPushNotificationToggler] = useState(true)
  // const [SMSNotificationToggler, setSMSNotificationToggler] = useState(true)
  const handleLogout = () => {
    realm.write(() => {
      realm.deleteAll()
    })
    logout()
  }

  const handleProfileInfo = () => {
    props.navigation.navigate('profileUpdate')
  }

  const handleUpdatePassword = () => {
    console.log('update password')
    props.navigation.navigate('updatePassword')
  }

  const handleRateUs = () => console.log('leave a 5 star rating')

  const handleFAQs = () => props.navigation.navigate('faq')

  const handleContactUs = () => {
    Linking.openURL('mailto:work.sanwar.hussain@gmail.com')
  }

  return (
    <ScrollView style={{backgroundColor: Colors.white}}>
      <View style={{marginHorizontal: 20, marginTop: 24, marginBottom: 10}}>
        <TextMontserrat fontSize={28}>Account Settings</TextMontserrat>
        <TextMontserrat
          fontSize={16}
          style={{marginTop: 10, letterSpacing: 0.55}}>
          Update your Profile settings, password update, or contact us.
        </TextMontserrat>
      </View>
      <View>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: 10,
          }}
          onPress={handleProfileInfo}>
          <SimpleLineIcons
            name="user"
            size={24}
            color={Colors.imperialRed}
            style={{
              marginHorizontal: 20,
            }}
          />
          <View style={{flex: 1}}>
            <TextOpenSans fontSize={18}>Profile Information</TextOpenSans>
            <TextMontserrat fontSize={14}>
              Change your account information
            </TextMontserrat>
          </View>
          <SimpleLineIcons
            name="arrow-right"
            size={24}
            color="black"
            style={{marginRight: 10}}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: 10,
          }}
          onPress={handleUpdatePassword}>
          <SimpleLineIcons
            name="lock"
            size={24}
            color={Colors.imperialRed}
            style={{marginHorizontal: 20}}
          />
          <View style={{flex: 1}}>
            <TextOpenSans fontSize={18}>Update Password</TextOpenSans>
            <TextMontserrat fontSize={14}>
              Change your current password
            </TextMontserrat>
          </View>
          <SimpleLineIcons
            name="arrow-right"
            size={24}
            color="black"
            style={{marginRight: 10}}
          />
        </TouchableOpacity>
        <View
          style={{
            marginLeft: 60,
            borderBottomWidth: 1,
            borderColor: Colors.default_grey,
            opacity: 0.2,
          }}
        />

        {/* notifications section +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/}
        {/* <View>
          <TextMontserrat
            fontSize={16}
            style={{
              letterSpacing: 0.4,
              marginLeft: 20,
              marginTop: 20,
              marginBottom: 10,
            }}
            weight="medium">
            NOTIFICATIONS
          </TextMontserrat>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginVertical: 10,
            }}>
            <SimpleLineIcons
              name="bell"
              size={24}
              color={Colors.imperialRed}
              style={{marginLeft: 20}}
            />
            <View style={{marginLeft: -90}}>
              <TextOpenSans fontSize={18}>Push Notifications</TextOpenSans>
              <TextMontserrat fontSize={14}>
                For occasional updates
              </TextMontserrat>
            </View>
            <Switch
              style={{marginRight: 10}}
              trackColor={{
                true: Colors.imperialRed,
                false: Colors.default_grey,
              }}
              thumbColor={Colors.inputBackGroundWhite}
              onValueChange={(value) => {
                setPushNotificationToggler(value)
              }}
              value={pushNotificationToggler}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginVertical: 10,
            }}>
            <Feather
              name="message-square"
              size={24}
              color={Colors.imperialRed}
              style={{marginLeft: 20}}
            />
            <View style={{marginLeft: -80}}>
              <TextOpenSans fontSize={18}>SMS Notifications</TextOpenSans>
              <TextMontserrat fontSize={14}>
                For important reminders
              </TextMontserrat>
            </View>
            <Switch
              style={{marginRight: 10}}
              trackColor={{
                true: Colors.imperialRed,
                false: Colors.default_grey,
              }}
              thumbColor={Colors.inputBackGroundWhite}
              onValueChange={(value) => {
                setSMSNotificationToggler(value)
              }}
              value={SMSNotificationToggler}
            />
          </View>
        </View> */}
        {/* MORE section +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/}
        <View>
          <TextMontserrat
            fontSize={16}
            style={{
              letterSpacing: 0.4,
              marginLeft: 20,
              marginTop: 20,
              marginBottom: 10,
            }}
            weight="medium">
            MORE
          </TextMontserrat>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginVertical: 10,
            }}
            onPress={handleRateUs}>
            <FontAwesome5
              name="star"
              size={24}
              color={Colors.imperialRed}
              style={{marginHorizontal: 20}}
            />
            <View style={{flex: 1}}>
              <TextOpenSans fontSize={18}>Rate Us</TextOpenSans>
              <TextMontserrat fontSize={14}>Leave us a rating</TextMontserrat>
            </View>
            <SimpleLineIcons
              name="arrow-right"
              size={24}
              color="black"
              style={{marginRight: 10}}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginVertical: 10,
            }}
            onPress={handleFAQs}>
            <AntDesign
              name="book"
              size={24}
              color={Colors.imperialRed}
              style={{marginHorizontal: 20}}
            />
            <View style={{flex: 1}}>
              <TextOpenSans fontSize={18}>FAQs</TextOpenSans>
              <TextMontserrat fontSize={14}>
                Frequently asked questions
              </TextMontserrat>
            </View>
            <SimpleLineIcons
              name="arrow-right"
              size={24}
              color="black"
              style={{marginRight: 10}}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginVertical: 10,
            }}
            onPress={handleContactUs}>
            <AntDesign
              name="mail"
              size={24}
              color={Colors.imperialRed}
              style={{marginHorizontal: 20}}
            />
            <View style={{flex: 1}}>
              <TextOpenSans fontSize={18}>Contact Us</TextOpenSans>
              <TextMontserrat fontSize={14}>
                Mail us your suggestion or feedback
              </TextMontserrat>
            </View>
            <SimpleLineIcons
              name="arrow-right"
              size={24}
              color="black"
              style={{marginRight: 10}}
            />
          </TouchableOpacity>
          <View
            style={{
              marginLeft: 60,
              borderBottomWidth: 1,
              borderColor: Colors.default_grey,
              opacity: 0.2,
            }}
          />
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginVertical: 30,
            }}
            onPress={handleLogout}>
            <AntDesign
              name="logout"
              size={24}
              color={Colors.imperialRed}
              style={{marginHorizontal: 20}}
            />
            <View style={{flex: 1}}>
              <TextOpenSans fontSize={18}>Logout</TextOpenSans>
              <TextMontserrat fontSize={14}>
                Sign out of Ridelogg
              </TextMontserrat>
            </View>
            <SimpleLineIcons
              name="arrow-right"
              size={24}
              color="black"
              style={{marginRight: 10}}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <TextMontserrat
          fontSize={10}
          style={{color: Colors.tGrey, opacity: 0.2, marginBottom: 10}}>
          Storm0171
        </TextMontserrat>
      </View>
    </ScrollView>
  )
}

const mapDispatchToProps = (dispatch: any) => ({
  dispatch: dispatchHandler(dispatch),
})

export default connect(null, mapDispatchToProps)(Accounts)
