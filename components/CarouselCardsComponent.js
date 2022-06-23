import { Component } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import MaterialIcons from "react-native-vector-icons/MaterialCommunityIcons";
export const SLIDER_WIDTH = Dimensions.get("window").width;
export const ITEM_WIDTH = 150;
import { baseUrl } from "./../shared/baseUrl";

class CarouselCards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 1,
    };
  }
  render() {
    return (
      <View style={styles.carousel}>
        <View style={styles.titleBar}>
          <Text
            style={{
              color: this.props.colorTitle,
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            {this.props.title}
          </Text>
          <MaterialIcons
            name={this.props.iconName}
            size={26}
            color={this.props.colorTitle}
            style={{ marginLeft: 10 }}
          ></MaterialIcons>
        </View>
        <Carousel
          layout="default"
          layoutCardOffset={9}
          data={this.props.songs}
          renderItem={({ item, index }) => this.renderItem(item, index)}
          keyExtractor={(item) => item.id.toString()}
          sliderWidth={SLIDER_WIDTH}
          itemWidth={ITEM_WIDTH}
          inactiveSlideShift={0}
          onSnapToItem={(index) => this.setState({ index: index })}
          useScrollView={true}
          autoplay={true}
          firstItem={1}
        />
        <Pagination
          dotsLength={this.props.songs.length}
          activeDotIndex={this.state.index}
          dotStyle={{
            width: 10,
            height: 10,
            borderRadius: 5,
            backgroundColor: this.props.colorTitle,
          }}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
        />
      </View>
    );
  }
  renderItem(item, index) {
    const { navigate } = this.props.navigation;

    return (
      <TouchableOpacity
        style={styles.container}
        key={index}
        onPress={() => {
          this.props.pressSong(this.props.context, item);
          navigate("SongPlayer");
        }}
      >
        <Image source={{ uri: baseUrl + item.image }} style={styles.image} />
        <Text style={styles.name}>
          {item.name.length <= 19
            ? item.name
            : item.name.substring(0, 16) + "..."}
        </Text>
        <Text style={styles.singer}>
          {item.singer.length <= 27
            ? item.singer
            : item.singer.substring(0, 24) + "..."}
        </Text>
      </TouchableOpacity>
    );
  }
}
export const styles = StyleSheet.create({
  carousel: {
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  titleBar: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
  },
  container: {
    backgroundColor: "white",
    borderRadius: 10,
    width: ITEM_WIDTH,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  image: {
    width: ITEM_WIDTH,
    height: 100,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  name: {
    color: "#222",
    fontSize: 12,
    fontWeight: "bold",
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
  },
  singer: {
    color: "#222",
    fontSize: 8,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
  },
});
export default CarouselCards;
