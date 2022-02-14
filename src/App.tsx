import { AppLayout } from "./AppLayout";
import { Grid } from "./Components/Grid";
import { PossibleWords } from "./Components/PossibleWords";
import { SuggestedWords } from "./Components/SuggestedWords";
import { GameProvider } from "./Contexts/Game";

export const App = () => {
  return (
    <GameProvider>
      <AppLayout>
        <div className="grid grid-cols-2 grid-flow-col">
          {/* <SuggestedWords /> */}
          <Grid />
          <PossibleWords />
        </div>
      </AppLayout>
    </GameProvider>
  );
};
