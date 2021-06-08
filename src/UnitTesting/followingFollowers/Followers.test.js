import Followers from "../../components/followingFollowers/Followers"
import {shallow, configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({adapter: new Adapter()});



describe("Displays the follower people by the user", ()=>{

    let wrapper;
    beforeEach(() => {
    wrapper = shallow(<Followers /> ); 
    });

    describe("Component rendering", () => {   
        it("Should render the wrapper div correctly", ()=>{
            const wrapperdiv= wrapper.find("div.picAndSelect");
            expect(wrapperdiv).toHaveLength(1);
        })
        it("Should render the wrapper div correctly", ()=>{
            const wrapperdiv= wrapper.find("Footer");
            expect(wrapperdiv).toHaveLength(1);
        })
    })

});
