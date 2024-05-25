import { Button } from "./ui/button";
import { Input } from "./ui/input";

export const PolicyUpload = () => (
    <div className="flex w-full max-w-sm items-center space-x-2">
        <Input id="policy" type="file" placeholder="Policy Upload" />
        <Button>Submit</Button>
    </div>
)