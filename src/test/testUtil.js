/**
 * Return shallow wrapper containing node(s) with the given data-test value.
 * @param {ShallowWrapper} wrapper, -enzyme Shallow wrapper to search within
 * @param {string} val - Value of data-test attribute for search
 * @returns {ShallowWrapper}
 */
export const findByTestAttr=(wrapper,val)=>(
    wrapper.find(`[data-test="${val}"]`)
);