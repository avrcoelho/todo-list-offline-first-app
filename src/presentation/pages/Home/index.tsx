import BottomSheet from "@gorhom/bottom-sheet";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

import { ButtonCreate } from "../../components/Buttons/Create";
import { Container } from "./styles";

export const Home = (): JSX.Element => {
  const [isVisible, setIsVisible] = useState(false);
  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => ["25%", "50%"], []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  const onHandleCreate = () => {
    setIsVisible(true);
  };

  return (
    <Container>
      <ButtonCreate onPress={onHandleCreate} />

      <BottomSheet
        ref={bottomSheetRef}
        index={isVisible ? 1 : -1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
      >
        <View style={styles.contentContainer}>
          <Text>Awesome 🎉</Text>
        </View>
      </BottomSheet>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "grey",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
});
