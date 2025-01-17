import * as React from "react";
import { Dimensions, Image, Text, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel, {
    ICarouselInstance,
    Pagination,
} from "react-native-reanimated-carousel";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import bn1 from "@/assets/banner/banner1.jpg"
import bn2 from "@/assets/banner/sg-11134258-7ra14-m4zi0qc14aq647_xhdpi.jpg"
import bn3 from "@/assets/banner/sg-11134258-7ra1c-m4zhzbvqvg0a4f_xxhdpi.jpg"
import bn4 from "@/assets/banner/sg-11134258-7ra3e-m4zi0rpf42s725_xhdpi.jpg"
const data = [{ id: 1, source: bn1 }, { id: 2, source: bn2 }, { id: 3, source: bn3 }, { id: 4, source: bn4 }];
const width = Dimensions.get("window").width;
const defaultDataWith6Colors = [
    "#B0604D",
    "#899F9C",
    "#B3C680",
    "#5C6265",
    "#F5D399",
    "#F1F1F1",
];
function BannerHome() {
    const ref = React.useRef<ICarouselInstance>(null);
    const progress = useSharedValue<number>(0);

    const onPressPagination = (index: number) => {
        ref.current?.scrollTo({
            /**
             * Calculate the difference between the current index and the target index
             * to ensure that the carousel scrolls to the nearest index
             */
            count: index - progress.value,
            animated: true,
        });
    };

    return (
        <GestureHandlerRootView>
            <View style={{ flex: 1, marginTop: 30 }}>
                <Carousel
                    ref={ref}
                    width={width}
                    height={width / 4}
                    data={data}
                    onProgressChange={progress}
                    renderItem={({ item, index }) => (
                        <View
                            style={{
                                flex: 1,
                                borderWidth: 1,
                                justifyContent: "center",
                            }}
                        >
                            <Image style={{ width: width, height: width / 3.7, resizeMode: "cover" }} source={item.source} />
                        </View>
                    )}
                />

                <Pagination.Basic<{ color: string }>
                    progress={progress}
                    data={defaultDataWith6Colors.map((color) => ({ color }))}
                    dotStyle={{
                        width: 5,
                        height: 2,
                        backgroundColor: "#262626",
                    }}
                    activeDotStyle={{
                        overflow: "hidden",
                        backgroundColor: "#f1f1f1",
                    }}
                    containerStyle={{
                        gap: 10,
                        marginBottom: 10,
                    }}
                    horizontal
                    onPress={onPressPagination}
                />
            </View>
        </GestureHandlerRootView>
    );
}

export default BannerHome;