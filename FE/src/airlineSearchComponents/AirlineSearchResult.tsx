import { searchResultType } from "./search-result-type";
import AirlineSearchResultCard from "./AirlineSearchResultCard";
import { currentFormatTime } from "./utils/formatTime";

type AirlineSearchResultProps = {
  data?: searchResultType[];
  isLoading: boolean;
  error?: Error;
};

function AirlineSearchResult({
  data,
  isLoading,
  error,
}: AirlineSearchResultProps) {
  return (
    <div>
      {isLoading && <div>데이터를 불러오는 중이에요..!</div>}
      {error && <div>에러: {error.message}</div>}
      {data
        ?.filter(
          ({ estimatedDateTime }) => estimatedDateTime >= currentFormatTime()
        )
        .slice(0, 10)
        .map((item: searchResultType, index: number) => (
          <AirlineSearchResultCard key={index} item={item} />
        ))}
    </div>
  );
}

export default AirlineSearchResult;
