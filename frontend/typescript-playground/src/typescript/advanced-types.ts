// /////////////////////////////////////////////////////////////
// Advanced Types ============================================
// ///////////////////////////////////////////////////////////

// Intersection Types ==========================================

// Combines multiple types into one
// ... an object of this type will have all members of all 
// three types.
function extend<T, U>(first: T, second: U): T & U {

}

// Union Types ===================================
// the 'OR' types... A | B